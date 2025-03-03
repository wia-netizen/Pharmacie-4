<script setup>
import { reactive, onMounted } from "vue";
import Medicament from "../Medicament.js";

const url = "https://apipharmacie.pecatte.fr/api/1/medicaments";
const medicaments = reactive([]);

// ======== GET Médicaments ===============
function fetchMedicaments() {
  fetch(url)
    .then((response) => response.json())
    .then((dataJSON) => {
      console.log(dataJSON);
      // Convertir les données en objets Medicament
      medicaments.splice(0, medicaments.length, ...dataJSON.map(
        m => new Medicament(m.id, m.denomination, m.formepharmaceutique, m.qte, m.photo)
      ));
    })
    .catch((error) => console.error("Erreur lors de la récupération :", error));
}

// ======== DELETE Médicament ===============
function deleteMedicament(id) {
  fetch(`${url}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => fetchMedicaments())
    .catch((error) => console.error("Erreur lors de la suppression :", error));
}

// ======== UPDATE Médicament ===============
// Augmenter la quantité
function increaseQuantity(med) {
  med.augmenterQuantite();
  updateMedicament(med);
}

// Diminuer la quantité
function decreaseQuantity(med) {
  med.diminuerQuantite();
  updateMedicament(med);
}

// Modifier un médicament
function updateMedicament(med) {
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
  })
    .then((response) => response.json())
    .then(() => fetchMedicaments())
    .catch((error) => console.error("Erreur lors de la modification :", error));
}

onMounted(fetchMedicaments);
</script>

<template>
  <h2>Liste des Médicaments</h2>
  <table>
    <tr>
      <th>Nom</th>
      <th>Forme</th>
      <th>Quantité</th>
      <th>Image</th>
      <th>Actions</th>
    </tr>
    <tr v-for="med in medicaments" :key="med.id">
      <td>{{ med.denomination }}</td>
      <td>{{ med.formepharmaceutique }}</td>
      <td>{{ med.qte }}</td>
      <td><img :src="`https://apipharmacie.pecatte.fr/images/${med.photo}`" width="50" /></td>
      <td>
        <button @click="increaseQuantity(med)">➕</button>
        <button @click="decreaseQuantity(med)">➖</button>
        <button @click="updateMedicament(med)">✏ Modifier</button>
        <button @click="deleteMedicament(med.id)">🗑 Supprimer</button>
      </td>
    </tr>
  </table>
</template>
