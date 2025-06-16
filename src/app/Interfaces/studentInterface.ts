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
}

export default StudentInterface;
