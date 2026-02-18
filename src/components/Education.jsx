import { useState } from "react";

function EducationSection() {
    /**
     * contains information related to the education section only.
     */

    // data: ["school", "titleOfStudy", "dateOfGraduation", "anythingElse"]

    const [school, setSchool] = useState('');
    const [titleOfStudy, setTitleOfStudy] = useState('');
    const [dateOfGrad, setDateOfGrad] = useState('');
    const [highlights, setHighlights] = useState('');

    const [editingView, setEditingView] = useState(true);

    if (editingView) {
        return (
            <div className="ml-10">
                <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Education details</h2>
                <p className="font-light text-2xl mb-5 text-gray-600">Tell us something about your education</p>
                <FormSection setterProps={ {setSchool, setTitleOfStudy, setDateOfGrad, setHighlights} } previousValues={ {school, titleOfStudy, dateOfGrad, highlights} }></FormSection>
                <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
            </div>
        );
    }

    return (
        <div className="ml-10">
            <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Education details</h2>
            <p className="font-light text-2xl mb-3 text-gray-600">Tell us something about your education</p>
            <div className="grid grid-cols-2 gap-4 max-w-7xl mb-2">
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">School</p>
                    <p className="submitted-stuff"> ↪ {school}</p>
                </div>
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Title of study</p>
                    <p className="submitted-stuff">↪ {titleOfStudy}</p>
                </div>                
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Date of Graduation</p>
                    <p className="submitted-stuff">↪ {dateOfGrad}</p>
                </div>                
                <div className="form-element col-span-full">
                    <p className="text-2xl font-medium text-gray-800">Anything else you would like to share?</p>
                    <p className="submitted-stuff">↪ {highlights}</p>
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
        <div className="grid grid-cols-2 gap-4 max-w-7xl mb-5">
            {/* <div className="row"> */}
                <FormElement elementName="School" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Title of study" setterProps={setterProps} previousValues={previousValues}></FormElement>
            {/* </div> */}

            {/* <div className="row"> */}
                <FormElement elementName="Date of graduation" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Anything else you would like to share?" setterProps={setterProps} previousValues={previousValues}></FormElement>
            {/* </div> */}
        </div>
    )
}

function FormElement({ elementName, setterProps, previousValues }){

    let inputType = 'text';
    let setter;
    let prevVal;
    
    const {setSchool, setTitleOfStudy, setDateOfGrad, setHighlights} = setterProps;
    const {school, titleOfStudy, dateOfGrad, highlights}  = previousValues;

    if (elementName === "School") {
        setter = setSchool;
        prevVal = school;
    }
    else if (elementName === "Title of study") {
        setter = setTitleOfStudy;
        prevVal = titleOfStudy;
    }    
    else if (elementName === "Date of graduation") {
        setter = setDateOfGrad;
        prevVal = dateOfGrad;
        inputType = "date";
    }    
    else if (elementName === "Anything else you would like to share?") {
        setter = setHighlights;
        prevVal = highlights;
        return (
        <div className="form-element col-span-full">
            <label htmlFor={elementName} className="text-2xl font-medium text-gray-800">{elementName} </label>
            <textarea name={elementName} onChange={handleChange} value={prevVal ? prevVal : ''} className="text-xl p-4 border-zinc-800 border-2 "/>
        </div>
        )
    }    
    // if there was some previous value, add that back, else keep it null

    function handleChange(event) {
        setter(event.target.value);
    }

    return (
        <div className="form-element">
            <label htmlFor={elementName} className="text-2xl font-medium text-gray-800">{elementName} </label>
            <input type={inputType} name={elementName} onChange={handleChange} value={prevVal ? prevVal : ''} />
        </div>
    )
}

function ButtonsSection({ handleEditClick, handleSubmitClick}){
    /**
     * Returns a section where there should be an edit button and a submit button.
     * Since this is always the same there is no reason to break this one down into subcomponents.
     */

    return (
        <div className="flex gap-5 mb-10">
            <button className="submit" onClick={handleSubmitClick}>Submit</button>
            <button className="edit" onClick={handleEditClick}>Edit</button>
        </div>
    )
}

export default EducationSection;