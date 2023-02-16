import React from 'react';
import ReactDOM from 'react-dom';
import styles from './startpage.css';
import pomPic from '../../assets/image/pomodoro.png';
import { CheckIcon } from '../Svg/ChechIcon';
import { useHistory } from 'react-router-dom';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import validator from 'validator';

interface FormValues {
  email: string;
  fullname: string;
  check: boolean;
}

interface OtherProps {
  message: string;
}

export function StartPage() {
  const modalRoot = document.querySelector('#modal_root');
  if (!modalRoot) return null;
  const history = useHistory();

  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;

    return (
      <Form className={styles.enterForm}>
        <h2 className={styles.formTitle}>{message}</h2>
        <Field type="text" name="fullname" className={styles.input} placeholder='Your name' />
        {touched.fullname && errors.fullname && <div className={styles.inputError}>{errors.fullname}</div>}

        <Field type="email" name="email" className={styles.input} placeholder='E-mail' />
        {touched.email && errors.email && <div className={styles.inputError}>{errors.email}</div>}

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting} >
          Submit
        </button>

        <label className={styles.check} >
          <Field className={styles.checkBox} type="checkbox" name="check"/>
          <span className={styles.checkMark} >
            <CheckIcon />
          </span>
          <span className={styles.checkText}>I agree to provide my personal data</span>
        </label>
        {touched.check && errors.check && <div className={styles.inputError}>{errors.check}</div>}
      </Form>
    );
  };

  interface MyFormProps {
    initialEmail?: string;
    message: string;
  }

  const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => {
      return {
        email: props.initialEmail || '',
        fullname: '',
        check: false,
      };
    },

    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!validator.isEmail(values.email)) {
        errors.email = 'Invalid email';
      }

      if (!values.fullname || values.fullname.trim().length === 0) {
        errors.fullname = 'Required';
      }

      if (!values.check) {
        errors.check = 'We need your agreement';
      }

      return errors;
    },

    handleSubmit: () => {
      history.push('/timer/');
    },
  })(InnerForm);

  return ReactDOM.createPortal ((
    <div className={styles.modalWrapper}>
      <div className={styles.logoWrapper}>
        <img src={pomPic} alt="Pomodoro" />
        <span className={styles.pomodoroBox}>pomodoro_box</span>
      </div>
      <MyForm message="Sign up"/>
    </div>
  ), modalRoot);
}
