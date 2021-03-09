import React from 'react';
import { useForm } from 'react-hook-form';

const FormField = ({formData, id, changeHandler}) => {
    const { register, errors } = useForm();

    const renderTemplate = () => {
        let formTemplate = null;

        console.log('input type: ', formData.element);

        switch(formData.element){
            case('input'):
                formTemplate = (
                    <div className='form-group field_section'>
                        { formData.showLabel ?
                            <label className="label label_inputs">
                                {formData.config.label}
                            </label>
                            : null
                        }
                        <input
                            className='form-control'
                            {...formData.config}
                            ref={register({ required: formData.validation.required })}
                            onChange={(event)=> changeHandler({event,id})}
                        />
                        {errors[formData.config.name] && <span>formData.validation.message</span>}
                    </div>
                );
                break;
            case('textarea'):
                formTemplate = (
                    <div className='form-group field_section'>
                        { formData.showLabel ?
                            <label className="label label_textarea">
                                {formData.config.label}
                            </label>
                            : null
                        }
                        <textarea
                            className='form-control'
                            {...formData.config}
                            ref={register({ required: formData.validation.required })}
                            onChange={(event)=> changeHandler({event,id})}
                        />
                        {errors[formData.config.name] && <span>{formData.validation.message}</span>}
                    </div>
                );
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    };

    return (
        renderTemplate()
    )
};

export default FormField;