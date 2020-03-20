exports.seed = function(knex) {
  return knex("parking").then(function() {
    return knex("parking").insert([
      {
        id: 1,
        parking_lot_name: "parking1",
        parking_lot_address: "parkingadd1",
        parking_lot_phone: "parkingphone1",
        parking_lot_cost: "parkingcost1",
        parking_lot_hours: "parkinghours1",
        parking_upvote: 1,
        parking_lot_note: "parkingnote1"
      },
      {
        id: 2,
        parking_lot_name: "parking2",
        parking_lot_address: "parkingadd2",
        parking_lot_phone: "parkingphone2",
        parking_lot_cost: "parkingcost2",
        parking_lot_hours: "parkinghours2",
        parking_upvote: 2,
        parking_lot_note: "parkingnote2"
      },
      {
        id: 3,
        parking_lot_name: "parking3",
        parking_lot_address: "parkingadd3",
        parking_lot_phone: "parkingphone3",
        parking_lot_cost: "parkingcost3",
        parking_lot_hours: "parkinghours3",
        parking_upvote: 3,
        parking_lot_note: "parkingnote3"
      }
    ]);
  });
};
