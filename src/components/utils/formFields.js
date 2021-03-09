import React from 'react';

const FormField = ({formData, id, change}) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
            {
                formData.validation && !formData.valid ?
                    formData.validationMessage
                    :null
            }
        </div>;
        return errorMessage
    };

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.element){
            case('input'):
                formTemplate = (
                    <div className='form-group field_section'>
                        { formData.showLabel ?
                            <h4 className="label label_inputs">
                                {formData.config.label}
                            </h4>
                            : null
                        }
                        <input
                            className='form-control'
                            {...formData.config}
                            value={formData.value}
                            onChange={(event)=> change({event,id})}
                        />
                        { showError() }
                    </div>
                );
                break;
            case('select'):
                formTemplate = (
                    <div className='form-group field_section'>
                        { formData.showLabel ?
                            <h4 className="label label_input">
                                {formData.config.label}
                            </h4>
                            :null
                        }
                        <select
                            className='form-control'
                            value={formData.value}
                            onChange={(event)=> change({event,id})}
                        >
                            <option value="">Select one</option>
                            {
                                formData.config.options.map((item)=>(
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        { showError() }
                    </div>
                );
                break;
            case('textarea'):
                formTemplate = (
                  <div className='form-group field_section'>
                      { formData.showLabel ?
                        <h4 className="label label_textarea">
                            {formData.config.label}
                        </h4>
                        : null
                      }
                      <textarea
                        className='form-control'
                        {...formData.config}
                        value={formData.value}
                        onChange={(event)=> change({event,id})}
                      />
                      { showError() }
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