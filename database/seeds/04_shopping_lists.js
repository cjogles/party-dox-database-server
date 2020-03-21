exports.seed = function(knex) {
  return knex("shopping_lists").then(function() {
    return knex("shopping_lists").insert([
      {
        id: 1,
        trip_id: 3,
        item_name: "item1",
        item_cost: "itemcost1",
        item_buyer: "itembuyer1",
        item_upvote: 1,
        item_notes: "itemnote1"
      },
      {
        id: 2,
        trip_id: 2,
        item_name: "item2",
        item_cost: "itemcost2",
        item_buyer: "itembuyer2",
        item_upvote: 2,
        item_notes: "itemnote2"
      },
      {
        id: 3,
        trip_id: 1,
        item_name: "item3",
        item_cost: "itemcost3",
        item_buyer: "itembuyer3",
        item_upvote: 3,
        item_notes: "itemnote3"
      }
    ]);
  });
};
