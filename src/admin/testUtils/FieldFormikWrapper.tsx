import { Form, Formik } from "formik";
import React from "react";
import { PropsWithChildren } from "react";

interface Props<T> extends PropsWithChildren<{}> {
  initialValues: Partial<T>;
  onSubmit: jest.Mock;
}

function FieldFormikWrapper<T>({ children, initialValues, onSubmit }: Props<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value) => onSubmit(value)}
    >
      {({ submitForm }) => (
        <Form>
          {children}

          <button
            style={{ pointerEvents: "all" }}
            data-testid="submit-button"
            onClick={submitForm}
          ></button>
        </Form>
      )}
    </Formik>
  );
}

export default FieldFormikWrapper;
