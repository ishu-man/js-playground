import { useState } from "react";

function PersonalSection() {
    /**
     * contains information related to the personal section only.
     */

    // data: ["firstName", "lastName", "email", "phoneNumber", "city", "country"]

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [editingView, setEditingView] = useState(false);

    if (editingView) {
        return (
            <div>
                <h2>Personal details</h2>
                <FormSection props={{setFirstName, setLastName, setEmail, setPhone, setCity, setCountry}}></FormSection>
                <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
            </div>
        );
    }

    return (
        <div>
            <h2>Personal details</h2>
            <p>First name: {firstName}</p>
            <p>Last name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Phone number: {phone}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
            <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
        </div>
    )

}

function FormSection(props) {
    /**
     * Contains form row which in itself contains form element. Let me pass one form row for now. 
     * Now that I think about it, the number of form rows should probably be a prop from parent.
     */

    return (
        <div>
            <FormRow rowNumber={1} props={props}></FormRow>
            <FormRow rowNumber={2} props={props}></FormRow>
            <FormRow rowNumber={3} props={props}></FormRow>
        </div>
    )
}

function FormRow({ rowNumber, props }){
    /**
     * Contains a single form row which in turn should contain at least one form element. 
     * The number of form elements should be a prop.
     */
    // if row number is 1 elements would be first and last name
    // if row number is 2 elements would be email and ph
    // if row number is 3 elements would be city and country 

    // what if attributes were an array of objects so that I can pass both the element's verbose name and the name of the setter function?

    const attributes = [];

    if (rowNumber === 1) {
        attributes.push("First name");
        attributes.push("Last name");
    }
    else if (rowNumber === 2) {
        attributes.push("Email");
        attributes.push("Phone number");
    }
    else if (rowNumber === 3) {
        attributes.push("City");
        attributes.push("Country");
    }

    return (
        <div>
            <FormElement elementName={attributes[0]} props={props}></FormElement>
            <FormElement elementName={attributes[1]} props={props}></FormElement>
            <hr></hr>
        </div>
    )
}

function FormElement({ elementName, setFirstName, setLastName, setEmail, setPhone, setCity, setCountry}){
    /**
     * Contains a single form element which should contain a label and an input. That's it. 
     * The type of input should probably be a prop, but this is subject to change.
     */

    let inputType = 'text';
    let setter;

    if (elementName === "First name") {
        setter = setFirstName;
    }
    else if (elementName === "Last name") {
        setter = setLastName;
    }    
    else if (elementName === "Email") {
        setter = setEmail;
        inputType = "email";
    }    
    else if (elementName === "Phone number") {
        setter = setPhone;
        inputType = "tel";
    }    
    else if (elementName === "City") {
        setter = setCity;
    }    
    else if (elementName === "Country") {
        setter = setCountry;
    }

    // if elementName is firstname, setFirstName should be considered 

    function handleChange(event) {
        setter(event.target.value);
    }

    return (
        <div className="form-element">
            <label htmlFor={elementName}>{elementName} </label>
            <input type={inputType} name={elementName} onChange={handleChange}/>
        </div>
    )
}

function ButtonsSection({ handleEditClick, handleSubmitClick}){
    /**
     * Returns a section where there should be an edit button and a submit button.
     * Since this is always the same there is no reason to break this one down into subcomponents.
     */

    return (
        <div className="buttons-section">
            <button className="submit" onClick={handleSubmitClick}>SUBMIT</button>
            <button className="edit" onClick={handleEditClick}>EDIT</button>
        </div>
    )
}

export default PersonalSection;