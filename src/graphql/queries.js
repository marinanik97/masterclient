import { gql } from "@apollo/client";

export const getKartons = gql`
  query getKartons {
    getKartons {
      id
      ime
      prezime
      JMBG
      pol
      datumrodjenja
      telefon
      email
    }
  }
`;

export const getKartonGraph = gql`
  query getKartonById($id: ID!) {
    getKartonById(id: $id) {
      id
      ime
      prezime
      JMBG
      pol
      datumrodjenja
      telefon
      email
    }
  }
`;

export const getUzorci = gql`
  query getUzoraks {
    getUzoraks {
      id
      potrebnirezultati
      karton {
        id
        ime
        prezime
        JMBG
        pol
        datumrodjenja
        telefon
        email
      }
      tipuzorka {
        id
        naziv
        opis
      }

      doktor {
        id
        specijalnost
        JMBG
        ime
        prezime
      }
    }
  }
`;

export const getParam = gql`
  query getParametars {
    getParametars {
      id
      naziv
      referentnevrednosti
    }
  }
`;
//uzimamo donji naziv a ne query pa naziv, a ovo export const, koristimo u usequery
export const getRezultats = gql`
  query getRezultats {
    getResults {
      id
      posiljalac
      datumupisa
      uzorak {
        id
        potrebnirezultati
        karton {
          id
          ime
          prezime
          JMBG
          pol
          datumrodjenja
          telefon
          email
        }
        tipuzorka {
          id
          naziv
          opis
        }

        doktor {
          id
          specijalnost
          JMBG
          ime
          prezime
        }
      }
    }
  }
`;

export const getListuIzvestaja = gql`
query getIzvestajs {
  getIzvestajs {
    id
    datumstampanja
    napomena
    doktor {
      id
      specijalnost
      JMBG
      ime
      prezime
    }
    karton{
       id
      ime
      prezime
      JMBG
      pol
      datumrodjenja
      telefon
      email
    }
  }
}
`;

export const getD = gql`
  query getDoctors {
    getDoctors {
      id
      specijalnost
      JMBG
      ime
      prezime
    }
  }
`;
