module.exports = {
  isValidFriend(friend) {
    const hasUsername =
      typeof friend.username == "string" && friend.username.trim() != "";
    const hasPassword =
      typeof friend.password == "string" && friend.password.trim() != "";
    const hasFriend_name =
      typeof friend.friend_name == "string" && friend.friend_name.trim() != "";
    return hasUsername && hasPassword && hasFriend_name;
  },
  isValidTrip(trip) {
    const hasTripName =
      typeof trip.trip_name == "string" && trip.trip_name.trim() != "";
    return hasTripName;
  }
};
