import { RegistrationForm } from "../../models/types/userTypes";

const normalizeUser = (user: RegistrationForm) => {
  return {
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    address: {
      street: user.street,
      city: user.city,
      state: user.state,
      country: user.country,
      houseNumber: +user.houseNumber,
      zip: +user.zip,
    },
    image: {
      url: user.url,
      alt: user.alt,
    },
    isBusiness: user.isBusiness,
  };
};

export default normalizeUser;
