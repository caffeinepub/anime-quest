import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";

actor {
  type Character = {
    id : Nat;
    name : Text;
    appearance : Text;
    story : Text;
    riddle : Text;
    answer : Text;
  };

  module Character {
    public func compare(character1 : Character, character2 : Character) : Order.Order {
      Nat.compare(character1.id, character2.id);
    };
  };

  type User = {
    unlockedCharacters : Set.Set<Nat>;
  };

  let characters = Array.tabulate(
    20,
    func(i) {
      {
        id = i;
        name = "Character " # i.toText();
        appearance = "Appearance " # i.toText();
        story = "Story " # i.toText();
        riddle = "Riddle " # i.toText();
        answer = "Answer " # i.toText();
      };
    },
  );

  let userMap = Map.empty<Principal, User>();

  public shared ({ caller }) func unlockCharacter(characterId : Nat, answer : Text) : async Bool {
    if (characterId >= characters.size()) {
      Runtime.trap("Invalid character ID");
    };

    let character = characters[characterId];

    if (Text.equal(answer, character.answer)) {
      let user = switch (userMap.get(caller)) {
        case (null) { { unlockedCharacters = Set.empty<Nat>() } };
        case (?user) { user };
      };

      user.unlockedCharacters.add(characterId);
      userMap.add(caller, user);
      true;
    } else {
      false;
    };
  };

  public query ({ caller }) func getUnlockedCharacters() : async [Character] {
    let user = switch (userMap.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };

    characters.filter(
      func(character) {
        user.unlockedCharacters.contains(character.id);
      }
    );
  };

  public query ({ caller }) func getCharacter(characterId : Nat) : async Character {
    if (characterId >= characters.size()) {
      Runtime.trap("Invalid character ID");
    };
    characters[characterId];
  };

  public query ({ caller }) func getAllCharacters() : async [Character] {
    characters.sort();
  };
};
