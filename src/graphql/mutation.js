import { gql } from "@apollo/client";

export const NewRezultatMutation = gql`
  mutation newResult($input: newRezultatInput) {
    newResult(input: $input) {
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

export const DeleteRezultatMutation = gql`
  mutation deleteResult($id: ID!) {
    deleteResult(id: $id) {
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

export const EditRezultatMutation = gql`
  mutation editResult($input: editRezultatInput) {
    editResult(input: $input) {
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

export const DeleteIzvestaj = gql`
  mutation deleteIzvestaj($id: ID!) {
    deleteIzvestaj(id: $id) {
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
    }
  }
`;

export const SacuvajIzvestaj = gql`
  mutation newIzvestaj($input: newIzvestajInput) {
    newIzvestaj(input: $input) {
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
    }
  }
`;

export const SacuvajStavku = gql`
  mutation newStavka($input: newStavkaInput) {
    newStavka(input: $input) {
      id
      rb
      indikator
      rezultatparametra
      status
      parametar {
        id
        naziv
        referentnevrednosti
      }
      izvestaj {
        id
        datumstampanja
        napomena
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
      }
    }
  }
`;

export const SacuvajKarton = gql`
  mutation newKarton($input: newKartonInput) {
    newKarton(input: $input) {
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

export const EditKarton = gql`
  mutation editKarton($input: editKartonInput) {
    editKarton(input: $input) {
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

export const EditStavka = gql`
  mutation editStavka($input: editStavkaInput) {
    editStavka(input: $input)
  }
`;
