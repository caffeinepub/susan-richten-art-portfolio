import Set "mo:core/Set";
import Text "mo:core/Text";

actor {
  var totalPageViews = 0;
  let uniqueVisitorIds = Set.empty<Text>();

  public query ({ caller }) func getPageViewCount() : async Nat {
    totalPageViews;
  };

  public query ({ caller }) func getUniqueVisitorCount() : async Nat {
    uniqueVisitorIds.size();
  };

  public shared ({ caller }) func incrementPageView() : async () {
    totalPageViews += 1;
  };

  public shared ({ caller }) func addUniqueVisitor(visitorId : Text) : async Bool {
    if (uniqueVisitorIds.contains(visitorId)) {
      false;
    } else {
      uniqueVisitorIds.add(visitorId);
      true;
    };
  };
};
