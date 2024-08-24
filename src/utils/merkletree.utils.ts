import { MerkleTree } from 'merkletreejs'
const SHA256 = require('crypto-js/sha256');


// Function to create hash of each leaf node
const hashLeaf = (leafData) => {
  return SHA256(leafData).toString();
};

// Function to create a Merkle tree and generate a root and proof
const createMerkleTree = (csvFilePath) => {
  // Extract relevant data to form leaf nodes
  const leafNodes = records.map(record => {
    const leafString = `${record['Wallet address']},${record['Wallet nickname (optional)']},${record['Number of tokens to vest']},${record['Relationship']},${record['Vesting start date (DD/MM/YYYY)']},${record['Vesting start time']},${record['Vesting end date (DD/MM/YYYY)']},${record['Vesting end time']},${record['Vesting cadence']},${record['Cliff length (months) - optional']},${record['Release percentage at cliff end (%) - optional']}`;
    return hashLeaf(leafString);
  });

  // Create Merkle tree from leaf nodes
  const merkleTree = new MerkleTree(leafNodes, SHA256);
  const merkleRoot = merkleTree.getRoot().toString('hex');

  console.log('Merkle Root:', merkleRoot);

  // Generate proof for the first leaf (as an example)
  const leafToProve = leafNodes[0];
  const proof = merkleTree.getProof(leafToProve).map(x => x.data.toString('hex'));

  console.log('Merkle Proof for the first leaf:', proof);

  return {
    merkleRoot,
    proof
  };
};

// Example usage
const { merkleRoot, proof } = createMerkleTree('path/to/your/file.csv');

console.log('Merkle Root:', merkleRoot);
console.log('Proof for the first leaf:', proof);
