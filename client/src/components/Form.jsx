import { useState } from "react";

import LanguageSelector from "@marcoparrone/react-language-selector";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Form({ isReady, setIsLoading }) {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    language: "english",
    experience: "",
    address: "",
  });
  const [phoneNumber, setPhoneNumber] = useState(null);

  function handleLanguageChange() {
    const selectElement = document.getElementById("LanguageSelector");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedText = selectedOption.text;
    setFormFields((prevState) => ({
      ...prevState,
      language: selectedText,
    }));
  }

  async function handleFormSubmit(e) {
    setIsLoading(true);
    isReady(false);
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/cover-letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formFields.name,
          jobTitle: formFields.jobTitle,
          jobDescription: formFields.jobDescription,
          companyName: formFields.companyName,
          language: formFields.language,
          email: formFields.email,
          address: formFields.address,
          experience: formFields.experience,
          phoneNumber,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      isReady(true);
      setIsLoading(false);
      setFormFields({
        name: "",
        email: "",
        jobTitle: "",
        jobDescription: "",
        companyName: "",
        address: "",
        experience: "",
      });
      setPhoneNumber(null);
    }
  }

  return (
    <form
      className="mx-auto max-w-[43rem] px-4 py-6"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-800 font-bold">
          Full Name
        </label>
        <input
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
          required
          value={formFields.name}
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-800 font-bold">
          Email
        </label>
        <input
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          required
          value={formFields.email}
          type="email"
          name="name"
          id="name"
          placeholder="Johndoe@gmail.com"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-800 font-bold">
          Address
        </label>
        <input
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              address: e.target.value,
            }))
          }
          required
          value={formFields.address}
          type="text"
          name="name"
          id="name"
          placeholder="Cluj-Napoca"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">
          Job Title
        </label>
        <input
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              jobTitle: e.target.value,
            }))
          }
          required
          value={formFields.jobTitle}
          type="text"
          name="email"
          id="email"
          placeholder="Software developer"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">
          Company name
        </label>
        <input
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              companyName: e.target.value,
            }))
          }
          required
          value={formFields.companyName}
          type="text"
          name="email"
          id="email"
          placeholder="Google"
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">
          Experience (as detailed as possible)
        </label>
        <textarea
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              experience: e.target.value,
            }))
          }
          required
          value={formFields.experience}
          name="email"
          id="email"
          placeholder="Worked as a software developer..."
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-800 font-bold">
          Job description
        </label>
        <textarea
          onChange={(e) =>
            setFormFields((prevState) => ({
              ...prevState,
              jobDescription: e.target.value,
            }))
          }
          required
          value={formFields.jobDescription}
          type="text"
          name="email"
          id="email"
          placeholder="We have a new job opportunity for a Node.js developer..."
          className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-800 font-bold">
          Phone number
        </label>
        <PhoneInput
          rules={{ required: true }}
          placeholder="Enter phone number"
          defaultCountry="RO"
          value={phoneNumber}
          onChange={setPhoneNumber}
          className="flex gap-2 border border-gray-300 py-2 pl-3 rounded mt-2 outline-1 outline-indigo-600/95"
        />
      </div>

      <div className="flex items-center justify-between mb-10">
        <label htmlFor="email" className="block text-gray-800 font-bold">
          Cover letter language
        </label>
        <LanguageSelector handleSettingsChange={handleLanguageChange} />
      </div>

      <button className="cursor-pointer py-2 px-4 block bg-indigo-600/95 hover:bg-indigo-600/90 font-bold w-full text-center text-white rounded">
        Submit
      </button>
    </form>
  );
}

export default Form;
