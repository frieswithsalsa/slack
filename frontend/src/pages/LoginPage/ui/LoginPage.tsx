import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{ nickname: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.nickname) {
                        errors.nickname = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.nickname)
                    ) {
                        errors.nickname = 'Invalid nickname';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (

                    <Form className={styles.form}>
                        <Field type="nickname" name="nickname" />
                        <ErrorMessage name="nickname" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;