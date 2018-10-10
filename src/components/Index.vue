<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id"> 
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text"> {{ smoothie.title }} </h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip"> {{ ing }} </span>
          </li>
        </ul>
      </div>
    </div>
   
  </div>
</template>

<script>
import db from "../firebase/init.js";

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      // //Delete from Local
      // this.smoothies = this.smoothies.filter(smoothie => {
      //   return smoothie.id != id;
      // });

      //Delete from Firestore
      db.collection("Smoothies") //Where should the request be looking in the Database?
        .doc(id) //What should we be looking for?
        .delete() //What do you want to do with that .doc(id)? Delete it.
        .then(() => {
          //Great! It's gone from the DB. But now we need to update the front-end...
          this.smoothies = this.smoothies.filter(smoothie => {
            //This removes it from the front end as well.
            return smoothie.id != id;
          });
        });
    }
  },
  created() {
    //Fetch data from the Firestore DB
    db.collection("Smoothies") //Where should the request be looking in the Database?
      .get() //What do you want to do?
      .then(snapshot => {
        //Then we're going to grab all the instances in the Database.
        snapshot.forEach(doc => {
          //For each instance, we're going to search the doc for new items
          let smoothie = doc.data(); //Each smoothis is going to have the info doc.data()
          smoothie.id = doc.id; //We also want to add the auto generated Database ID as the smoothie ID.
          this.smoothies.push(smoothie); //Now we want to push everything into the array in data() called smoothies: []
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

/* He uses the .index in front instead of scoping the style tag. It is more efficient this way, and easier to track. */

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.index .delete:hover {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aa0000;
  font-size: 1.4em;
}
</style>
