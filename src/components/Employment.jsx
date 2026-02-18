import { useState } from "react";

function EmploymentSection() {
    /**
     * contains information related to the employment section only.
     */

    // data: ["employer", "jobTitle", "details", "joinDate", "leaveDate"]

    const [employer, setEmployer] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [details, setDetails] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [leaveDate, setLeaveDate] = useState('');

    const [editingView, setEditingView] = useState(true);

    if (editingView) {
        return (
            <div className="ml-10">
                <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Employment details</h2>
                <p className="font-light text-2xl mb-5 text-gray-600">Add your employment details here</p>
                <FormSection setterProps={ {setEmployer, setJobTitle, setDetails, setJoinDate, setLeaveDate} } previousValues={ {employer, jobTitle, details, joinDate, leaveDate} }></FormSection>
                <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
            </div>
        );
    }

    return (
        <div className="ml-10">
            <h2 className="font-bold text-5xl mt-5 mb-2 text-gray-700 ">Employment details</h2>
            <p className="font-light text-2xl mb-3 text-gray-600">Add your employment details here</p>
            <div className="grid grid-cols-2 gap-4 max-w-7xl mb-2">
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Employer</p>
                    <p className="submitted-stuff"> ↪ {employer}</p>
                </div>
                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Job title</p>
                    <p className="submitted-stuff">↪ {jobTitle}</p>
                </div>                
                <div className="form-element col-span-full">
                    <p className="text-2xl font-medium text-gray-800">Details</p>
                    <p className="submitted-stuff">↪ {details}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Date of joining</p>
                    <p className="submitted-stuff">↪ {joinDate}</p>
                </div>                <div className="form-element">
                    <p className="text-2xl font-medium text-gray-800">Date of leaving</p>
                    <p className="submitted-stuff">↪ {leaveDate}</p>
                </div>               
            </div>
            <ButtonsSection handleEditClick={()=> setEditingView(true)} handleSubmitClick={() => setEditingView(false)}></ButtonsSection>
        </div>
    )

}

function FormSection({ setterProps, previousValues }) {
    return (
        <div className="grid grid-cols-2 gap-4 max-w-7xl mb-5">
                <FormElement elementName="Employer" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Job title" setterProps={setterProps} previousValues={previousValues}></FormElement>

                <FormElement elementName="Details" setterProps={setterProps} previousValues={previousValues}></FormElement>

                <FormElement elementName="Date of joining" setterProps={setterProps} previousValues={previousValues}></FormElement>
                <FormElement elementName="Date of leaving" setterProps={setterProps} previousValues={previousValues}></FormElement>
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
    
    const {setEmployer, setJobTitle, setDetails, setJoinDate, setLeaveDate} = setterProps;
    const {employer, jobTitle, details, joinDate, leaveDate}  = previousValues;

    if (elementName === "Employer") {
        setter = setEmployer;
        prevVal = employer;
    }
    else if (elementName === "Job title") {
        setter = setJobTitle;
        prevVal = jobTitle;
    }    
    else if (elementName === "Details") {
        setter = setDetails;
        // details should be a text area.
        prevVal = details;
        return (
        <div className="form-element col-span-full">
            <label htmlFor={elementName} className="text-2xl font-medium text-gray-800">{elementName} </label>
            <textarea name={elementName} onChange={handleChange} value={prevVal ? prevVal : ''}  className="text-xl p-4 border-zinc-800 border-2 "/>
        </div>
        )
    }    
    else if (elementName === "Date of joining") {
        setter = setJoinDate;
        inputType = "date";
        prevVal = joinDate;
    }    
    else if (elementName === "Date of leaving") {
        setter = setLeaveDate;
        inputType = "date";
        prevVal = leaveDate;
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

export default EmploymentSection;