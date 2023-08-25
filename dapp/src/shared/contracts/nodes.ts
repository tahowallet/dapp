export const nodePropertiesByZoneId: Record<
  string,
  { node: string; nodeName: string; governanceToken: string }
> = {
  "4": {
    node: "0x90B77eB27624556A5F5bff0a9c3C22203C805Cc5",
    nodeName: "VAMPIRE_NODE",
    governanceToken: CONTRACT_VampireNodeVeTaho,
  },
  "7": {
    node: "0xD15aff59A4695dc80C0923897388f171648e4D90",
    nodeName: "EDUCATE_NODE",
    governanceToken: CONTRACT_EducateNodeVeTaho,
  },
  "9": {
    node: "0x0012f8e7b59562750e8bB0884B1aD70E722958ce",
    nodeName: "SOCIAL_NODE",
    governanceToken: CONTRACT_SocialNodeVeTaho,
  },
  "19": {
    node: "0x4c45A3eb36258a0e1946f2Fba1340C5170FbD00b",
    nodeName: "CREATORS_NODE",
    governanceToken: CONTRACT_CreatorsNodeVeTaho,
  },
  "22": {
    node: "0xE60475b56BfE49575ec504F398b969a4F231E6a1",
    nodeName: "DEFI_NODE",
    governanceToken: CONTRACT_DeFiNodeVeTaho,
  },
}

export default {}
