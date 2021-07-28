import { gql } from "@apollo/client";

export const NewResultMutation = gql`
  mutation newResult($input: newResultInput) {
    newResult(input: $input) {
      id
      sender
      dateofentry
      sample {
        id
        requiredresults
        medicalrecord {
          id
          name
          surname
          JMBG
          gender
          dateofbirth
          phonenumber
          email
        }
        sampletype {
          id
          name
          description
        }

        doctor {
          id
          specialty
          JMBG
          name
          surname
        }
      }
    }
  }
`;

export const DeleteResultMutation = gql`
  mutation deleteResult($id: ID!) {
    deleteResult(id: $id) {
      id
      sender
      dateofentry
      sample {
        id
        requiredresults
        medicalrecord {
          id
          name
          surname
          JMBG
          gender
          dateofbirth
          phonenumber
          email
        }
        sampletype {
          id
          name
          description
        }

        doctor {
          id
          specialty
          JMBG
          name
          surname
        }
      }
    }
  }
`;

export const EditResultMutation = gql`
  mutation editResult($input: editResultInput) {
    editResult(input: $input) {
      id
      sender
      dateofentry
      sample {
        id
        requiredresults
        medicalrecord {
          id
          name
          surname
          JMBG
          gender
          dateofbirth
          phonenumber
          email
        }
        sampletype {
          id
          name
          description
        }

        doctor {
          id
          specialty
          JMBG
          name
          surname
        }
      }
    }
  }
`;

export const DeleteReport = gql`
  mutation deleteReport($id: ID!) {
    deleteReport(id: $id) {
      id
      dateofprinting
      note
      doctor {
        id
        specialty
        JMBG
        name
        surname
      }
    }
  }
`;

export const SaveReport = gql`
  mutation newReport($input: newReportInput) {
    newReport(input: $input) {
      id
      dateofprinting
      note
      doctor {
        id
        specialty
        JMBG
        name
        surname
      }
      medicalrecord {
        id
        name
        surname
        JMBG
        gender
        dateofbirth
        phonenumber
        email
      }
    }
  }
`;

export const SaveReportItem = gql`
  mutation newReportItem($input: newReportItemInput) {
    newReportItem(input: $input) {
      id
      serialnumber
      indicator
      parameterresult
      status
      parameter {
        id
        name
        referencevalues
      }
      report {
        id
        dateofprinting
        note
        medicalrecord {
          id
          name
          surname
          JMBG
          gender
          dateofbirth
          phonenumber
          email
        }
      }
    }
  }
`;

export const SaveMedicalRecord = gql`
  mutation newMedicalRecord($input: newMedicalRecordInput) {
    newMedicalRecord(input: $input) {
      id
      name
      surname
      JMBG
      gender
      dateofbirth
      phonenumber
      email
    }
  }
`;

export const EditMedicalRecord = gql`
  mutation editMedicalRecord($input: editMedicalRecordInput) {
    editMedicalRecord(input: $input) {
      id
      name
      surname
      JMBG
      gender
      dateofbirth
      phonenumber
      email
    }
  }
`;

export const EditReportItem = gql`
  mutation editReportItem($input: editReportItemInput) {
    editReportItem(input: $input)
  }
`;
