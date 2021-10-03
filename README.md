# puppeeth
A simple NFT learning project between a father and daughter

## Background

I have a small startup and have various projects to learn and apply blockchain technology. This project is an NFT art collection in collaboration with my daughter, a talented young artist.

We are starting simple. She provides a basic set of image sets, and I do the rest.

This project is intended to be the first of many to showcase her artwork and demonstrate our abilities.

## How it works

Creating the _puppeeth_ NFT collection has two parts:

1. Creating the unique artwork
2. Creating the blockchain smart contract

### Creating the unique artwork

The images are PNG files stores in the `img/parts` directory.

Pups consist of a _body_, _fur_, _face_, _ears_, and _shirt_.

Each pup has a unique number 5 digits long, each digit ranging from 1 to 5.

Each value indicates which part variation the pup has, whether _one_, _green_, _red_, _teal_, or _yellow_.

For example, Ted 11111 is all blue, and Ted 22222 is all green, Ted 11222 is part blue and part green, and so on.

The collection is generated with a small `python` script using the Pillow image library. A single loop iterates from Pup 11111 to Pupxsxx 55555, skipping any number with a digit greater than 5, combining the respective par images, and outputs the unique Ted into the `img/collection` directory.

Please see [generate_collection.py](generate_collection.py) for more information on the algorithm.

#### Uniqueness

Total NFTs: 3125 (5 parts ^ 5 variants)

| Type | # in collection | Examples | Percentage |
| --- | --- | --- | --- |
| Original Variations | 5 | 11111, 22222, 33333 | 0.16% |
| Single Part Difference | 100 | 11112, 22225, 44144 | 3.2% |

#### Script performance

```
% time python3 generate_collection.py

python3 generate_collection.py  7761.16s user 87.18s system 638% cpu 20:28.44 total
```

### Creating the blockchain smart contract