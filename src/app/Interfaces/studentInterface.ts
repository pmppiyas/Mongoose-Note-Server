export interface addressInterface {
  city: string;
  street: string;
  zip: number;
}

interface StudentInterface {
  firstName: string;
  lastName: string;
  class: number;
  section: "A" | "B" | "C";
  rollNo: number;
  phone: number;
  email: string;
  password: string | number;
  birthDate?: Date;
  address: addressInterface;
}

export default StudentInterface;
