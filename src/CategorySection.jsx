import requiredData from "./data";

function CategorySection({ categoryName }) {
    /**
     * Contains category header, form section and buttons section
     * I need to somehow customize this based on what category is presented to me.
     * Let me create a JSON for the data I would need for different categories, ex. for education I would need school, title of study, finished, etc.
     */
    let currentData = [];
    for (const object of requiredData) {
        if (object.section === categoryName) {
            currentData = object.data; 
        }
    }
    console.log(currentData);
    return (
        <div>
            <h2>{categoryName} details</h2>
            <FormSection></FormSection>
            <ButtonsSection></ButtonsSection>
        </div>
    );
}

function FormSection() {
    /**
     * Contains form row which in itself contains form element. Let me pass one form row for now. 
     * Now that I think about it, the number of form rows should probably be a prop from parent.
     */

    return (
        <div>
            <FormRow></FormRow>
        </div>
    )
}

function FormRow(){
    /**
     * Contains a single form row which in turn should contain at least one form element. 
     * The number of form elements should be a prop.
     */
    return (
        <div>
            <FormElement></FormElement>
        </div>
    )
}

function FormElement(){
    /**
     * Contains a single form element which should contain a label and an input. That's it. 
     * The type of input should probably be a prop, but this is subject to change.
     */

    return (
        <div className="form-element">
            <label htmlFor="form-input">Form input</label>
            <input type="text" name="form-input"/>
        </div>
    )
}

function ButtonsSection(){
    /**
     * Returns a section where there should be an edit button and a submit button.
     * Since this is always the same there is no reason to break this one down into subcomponents.
     */

    return (
        <div className="buttons-section">
            <button className="submit">SUBMIT</button>
            <button className="edit">EDIT</button>
        </div>
    )
}

export default CategorySection;