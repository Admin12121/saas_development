const registration = [
  {
    id: "562",
    type: "TitleField",
    extraAttributes: { title: "Create Account", textAlign: "center" },
  },
  {
    id: "68",
    type: "EmailField",
    extraAttributes: {
      label: "Email",
      helperText: "",
      placeholder: "Enter your email...",
      required: true,
    },
  },
  {
    id: "4057",
    type: "UserField",
    extraAttributes: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      helperText: "",
      firstNamePlaceholder: "First name...",
      lastNamePlaceholder: "Last name...",
      required: true,
    },
  },
  {
    id: "2448",
    type: "PasswordField",
    extraAttributes: {
      label: "Password Field",
      helperText: "Helper Text",
      required: true,
      placeholder: "Enter your password...",
      showRequirements: true,
    },
  },
  {
    id: "2007",
    type: "SubmitButtonField",
    extraAttributes: { label: "Submit" },
  },
];

const login = [
  {
    id: "562",
    type: "TitleField",
    extraAttributes: { title: "Login ", textAlign: "center" },
  },
  {
    id: "68",
    type: "EmailField",
    extraAttributes: {
      label: "Email",
      helperText: "",
      placeholder: "Enter your email...",
      required: true,
    },
  },
  {
    id: "2448",
    type: "PasswordField",
    extraAttributes: {
      label: "Password Field",
      helperText: "Helper Text",
      required: true,
      placeholder: "Enter your password...",
      showRequirements: true,
    },
  },
  {
    id: "2007",
    type: "SubmitButtonField",
    extraAttributes: { label: "Submit" },
  },
];

const profile = [
  {
    id: "562",
    type: "TitleField",
    extraAttributes: { title: "Profile", textAlign: "left" },
  },
  {
    id: "68",
    type: "EmailField",
    extraAttributes: {
      label: "Email",
      helperText: "",
      placeholder: "Enter your email...",
      required: true,
    },
  },
  {
    id: "5651",
    type: "UserField",
    extraAttributes: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      helperText: "",
      firstNamePlaceholder: "First name...",
      lastNamePlaceholder: "Last name...",
      required: true,
    },
  },
  {
    id: "9334",
    type: "DateField",
    extraAttributes: {
      label: "Date of Birth",
      helperText: "Pick a date",
      required: true,
    },
  },
  {
    id: "2517",
    type: "TextField",
    extraAttributes: {
      label: "Addresh",
      helperText: "",
      placeholder: "Addresh",
      required: true,
    },
  },
  {
    id: "982",
    type: "SelectField",
    extraAttributes: {
      label: "Gender",
      helperText: "",
      placeHolder: "Choose Gender",
      required: true,
      options: ["Male", "Female"],
    },
  },
  {
    id: "2007",
    type: "SubmitButtonField",
    extraAttributes: { label: "Submit" },
  },
];

const membership = [
  {
    id: "9035",
    type: "TitleField",
    extraAttributes: { title: "Title field", textAlign: "left" },
  },
  {
    id: "6614",
    type: "TextField",
    extraAttributes: {
      label: "Text Field",
      helperText: "",
      placeholder: "Value here...",
      required: false,
    },
  },
  { id: "7154", type: "SeparatorField" },
  {
    id: "8286",
    type: "SubmitButtonField",
    extraAttributes: { label: "Submit" },
  },
];

const content = { registration, login, profile, membership };

export default content;