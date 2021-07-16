import { gql } from "@apollo/client";

export const getMedicalRecords = gql`
  query getMedicalRecords {
    getMedicalRecords {
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
//bio je getKartonGraph
export const getMedicalRecordById = gql`
  query getMedicalRecordById($id: ID!) {
    getMedicalRecordById(id: $id) {
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

export const getSamples = gql`
  query getSamples {
    getSamples {
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
`;

export const getParameters = gql`
  query getParameters {
    getParametars {
      id
      name
      referencevalues
    }
  }
`;
//uzimamo donji naziv a ne query pa naziv, a ovo export const, koristimo u usequery
export const getResults = gql`
  query getResults {
    getResults {
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
// getListuIzvestaja
export const getReports = gql`
  query getReports {
    getReports {
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

export const getDoctors = gql`
  query getDoctors {
    getDoctors {
      id
      specialty
      JMBG
      name
      surname
    }
  }
`;
