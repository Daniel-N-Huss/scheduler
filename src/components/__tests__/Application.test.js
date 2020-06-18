import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

jest.mock("axios");
afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    // 3- Click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4- Enter the name Lydia Miller-Jones into the input with placeholder Enter Student Name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5- Click the first interviewer in the list

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6- click the Save button on that same appointment

    fireEvent.click(getByText(appointment, "Save"));

    // 7- Check that the element with the text "Saving" is displayed.

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8- Wait until the element with the text "Lydia Miller-Jones" is displayed

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9- Check that the DayListItem with the text "Monday" also has the text "no spots remaining"

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.

    expect(
      getByText(
        appointment,
        "Are you sure you want to cancel this appointment?"
      )
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview, and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Grab the first filled appointment slot

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    //4. Clicks the "Edit" button

    fireEvent.click(getByAltText(appointment, "Edit"));

    //5. Check that the form is shown with the interviewer "Tory Malcom" selected

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    //6. Change the input field to "Daniel Huss"

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Daniel Huss" },
    });

    //7. Click on the first interviewer portrait

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //8. Click the save button on the same appointment

    fireEvent.click(getByText(appointment, "Save"));

    //9. Check that the "Saving" card appears on the screen.

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //10. Await the Show card to render with the Student Name

    await waitForElement(() => getByText(appointment, "Daniel Huss"));

    //11. Check that the interviewer "Sylvia Palmer" is displayed on the appointment and that one spot remains

    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 4- Enter the name Lydia Miller-Jones into the input with placeholder Enter Student Name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5- Click the first interviewer in the list

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6- click the Save button on that same appointment

    fireEvent.click(getByText(appointment, "Save"));

    // 7- Check that the element with the text "Saving" is displayed.

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8- Wait until the element with the error text is displayed

    await waitForElement(() => getByText(appointment, /an error occured/i));

    //9 Close the error window
    fireEvent.click(getByAltText(appointment, "Close"));

    //10 Expect that the empty form will be shown again
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();

    //11 expect one spot to remain for monday

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failiing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.

    expect(
      getByText(
        appointment,
        "Are you sure you want to cancel this appointment?"
      )
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.

    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7- Wait until the element with the error text is displayed

    await waitForElement(() => getByText(appointment, /an error occured/i));

    //8 Close the error window
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
