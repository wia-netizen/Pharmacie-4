export default class Medicament {
  constructor(id, denomination, formepharmaceutique, qte, photo) {
    this._id = id;
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._qte = qte;
    this._photo = photo;
  }

  // Getters
  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get qte() {
    return this._qte;
  }

  get photo() {
    return this._photo;
  }

  // Setters
  set denomination(value) {
    this._denomination = value;
  }

  set formepharmaceutique(value) {
    this._formepharmaceutique = value;
  }

  set qte(value) {
    this._qte = value;
  }

  set photo(value) {
    this._photo = value;
  }

  // Méthode pour afficher les informations du médicament
  pourAfficher() {
    return `Médicament: ${this._denomination} (${this._formepharmaceutique}) - Quantité: ${this._qte}`;
  }

  // Méthodes pour gérer la quantité
  augmenterQuantite() {
    this._qte += 1;
  }

  diminuerQuantite() {
    if (this._qte > 0) {
      this._qte -= 1;
    }
  }
}
