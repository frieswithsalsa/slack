import {Formik, Form, Field, ErrorMessage} from 'formik';
import styles from './LoginPage.module.scss';
import {classNames} from "@/shared/lib/classNames";
import SlackLogo from '../../../shared/assets/icons/slack.svg'

const LoginPage = () => {
    return (
        <>
            <div className={classNames(styles.wrapper)}>
                <div className={classNames(styles.card, {}, [])}>
                    <div className={styles.content}>
                        <div className={styles.logo}>
                            <img src={SlackLogo}/>
                        </div>

                        <div className={styles.right}>
                            <Formik
                                initialValues={{nickname: '', password: ''}}
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
                                onSubmit={(values, {setSubmitting}) => {
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
                                        <Field className={styles.field} type="nickname" name="nickname"/>
                                        <ErrorMessage name="nickname" component="div"/>
                                        <Field className={styles.field} type="password" name="password"/>
                                        <ErrorMessage name="password" component="div"/>
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginPage;

