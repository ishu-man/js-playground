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

    const [editingView, setEditingView] = useState(true);

    if (editingView) {
        return (
            <div>
                <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Personal details</h2>
                <p className="font-light text-2xl mb-3 text-gray-600">Add some details about yourself here</p>
                <FormSection setterProps={ {setFirstName, setLastName, setEmail, setPhone, setCity, setCountry} } previousValues={ {firstName, lastName, email, phone, city, country} }></FormSection>
                <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Personal details</h2>
            <p className="font-light text-2xl mb-3 text-gray-600">Add some details about yourself here</p>
            <div className="grid grid-cols-2 gap-4 max-w-7xl mb-2">
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">First name</p>
                    <p className="text-2xl font-thin italic text-gray-800">{firstName}</p>
                </div>
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Last name</p>
                    <p className="text-2xl font-thin italic text-gray-800">{lastName}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Email</p>
                    <p className="text-2xl font-thin italic text-gray-800">{email}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Phone number</p>
                    <p className="text-2xl font-thin italic text-gray-800">{phone}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">City</p>
                    <p className="text-2xl font-thin italic text-gray-800">{city}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Country</p>
                    <p className="text-2xl font-thin italic text-gray-800">{country}</p>
                </div>
            </div>
            <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
        </div>
    )

}

function FormSection({ setterProps, previousValues }) {
    /**
     * Contains form row which in itself contains form element. Let me pass one form row for now. 
     * Now that I think about it, the number of form rows should probably be a prop from parent.
     * ONE ERROR: It doesn't retain the value of the previous input when the submit button is clicked.
     */

    return (
        <div className="grid grid-cols-2 gap-4 max-w-7xl mb-2">
            {/* <div className="row"> */}
                <FormElement elementName="First name" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Last name" setterProps={setterProps} previousValues={previousValues}></FormElement>
            {/* </div> */}

            {/* <div className="row"> */}
                <FormElement elementName="Email" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Phone number" setterProps={setterProps} previousValues={previousValues}></FormElement>
            {/* </div> */}

            {/* <div className="row"> */}
                <FormElement elementName="City" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Country" setterProps={setterProps} previousValues={previousValues}></FormElement>
            {/* </div> */}
        </div>
    )
}

function FormElement({ elementName, setterProps, previousValues }){
    /**
     * Contains a single form element which should contain a label and an input. That's it. 
     * The type of input should probably be a prop, but this is subject to change.
     * If the edit button was clicked previously and there was some initial non null value it should be added back to the input value 
     * how will I know that the there was some previous input? state might be the answer.
     */

    let inputType = 'text';
    let setter;
    let prevVal;
    
    const {setFirstName, setLastName, setEmail, setPhone, setCity, setCountry} = setterProps;
    const {firstName, lastName, email, phone, city, country}  = previousValues;

    if (elementName === "First name") {
        setter = setFirstName;
        prevVal = firstName;
    }
    else if (elementName === "Last name") {
        setter = setLastName;
        prevVal = lastName;
    }    
    else if (elementName === "Email") {
        setter = setEmail;
        inputType = "email";
        prevVal = email;
    }    
    else if (elementName === "Phone number") {
        setter = setPhone;
        inputType = "tel";
        prevVal = phone;
    }    
    else if (elementName === "City") {
        setter = setCity;
        prevVal = city;
    }    
    else if (elementName === "Country") {
        setter = setCountry;
        prevVal = country;
    }

    // if there was some previous value, add that back, else keep it null

    function handleChange(event) {
        setter(event.target.value);
    }

    return (
        <div className="form-element">
            <label htmlFor={elementName} className="text-2xl font-medium text-gray-800">{elementName} </label>
            <input type={inputType} name={elementName} onChange={handleChange} value={prevVal ? prevVal : ''} className="border-1 border-purple-500 h-9 p-2"/>
        </div>
    )
}

function ButtonsSection({ handleEditClick, handleSubmitClick}){
    /**
     * Returns a section where there should be an edit button and a submit button.
     * Since this is always the same there is no reason to break this one down into subcomponents.
     */

    return (
        <div className="flex gap-2">
            <button className="submit" onClick={handleSubmitClick}>SUBMIT</button>
            <button className="edit" onClick={handleEditClick}>EDIT</button>
        </div>
    )
}

export default PersonalSection;