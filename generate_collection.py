from PIL import Image
import json
import concurrent.futures

# Start with digits for number of image sets
# e.g. 11 = 2 image sets, 111 = 3 image sets
start_id = 11111

# Define number of images/variations per set
num_parts = 5

# Determine maximum ID of a combination
# used to bound the loop
max_id = start_id * num_parts

# Counter
counter = start_id

# Lists of parts
parts_groups = ["one", "two", "three", "four", "five"]
bodies = ["Brown", "Blonde", "Beige", "Purple", "White"]
shirts = ["Woof", "Puppeeth", "No Kennel", "Gold Star", "Stars"]
furs = ["Spikey", "Curly", "Shaggy", "Groomed", "Fluffy"]
ears_types = ["Flappy", "Hairy", "Small", "Trendy", "Pointy"]
faces = ["Friendly", "Mad", "Worried", "Confident", "Mischievous"]

# List of combinations
combos = []

# Max workers
max_workers=7

def make_pup(combo):
    # Quick breakdown of the ID into parts and color
    img_id = str(combo)
    body = int(img_id[0]) - 1
    fur = int(img_id[1]) - 1
    face = int(img_id[2]) - 1
    ears = int(img_id[3]) - 1
    shirt = int(img_id[4]) - 1

    # Load respective images
    body_img = Image.open("img/parts/" + parts_groups[body] + "/body.png")
    shirt_img = Image.open("img/parts/" + parts_groups[shirt] + "/shirt.png")
    ears_img = Image.open("img/parts/" + parts_groups[ears] + "/ears.png")
    fur_img = Image.open("img/parts/" + parts_groups[fur] + "/fur.png")
    face_img = Image.open("img/parts/" + parts_groups[face] + "/face.png")

    # Paste images over each other
    body_img.alpha_composite(fur_img) 
    body_img.alpha_composite(face_img)
    body_img.alpha_composite(ears_img) 
    body_img.alpha_composite(shirt_img) 

    # Output the image
    body_img = body_img.convert('RGB')
    body_img.save("img/collection/" + img_id + ".jpg", "JPEG", optimize=True, quality=75)

    # Output the metadata
    metadata = {
        "name": "Pup " + img_id,
        "description": "A Pup from the Puppeeth collection",
        "image": "ipfs://",
        "attributes": [
            {
                "trait_type": "Body",
                "value": bodies[body]
            },
            {
                "trait_type": "Shirt",
                "value": shirts[shirt]
            },
            {
                "trait_type": "Ears",
                "value": ears_types[ears]
            },
            {
                "trait_type": "Fur",
                "value": furs[fur]
            },
            {
                "trait_type": "Face",
                "value": faces[face]
            }
        ]
    }
    with open("img/metadata/" + img_id + ".json", "w") as write_file:
        json.dump(metadata, write_file)

# Loop
while counter <= max_id:
    # Add combo to the list
    combos.append(counter)

    # Skip 6-0 for ones position
    if counter % 10 == 5:
        counter += 6
    else:
        counter += 1
    
    # Skip 6-0 for tens position
    if counter % 100 > 55:
        counter += 50
    
    # Skip 6-0 for hundreds position
    if counter % 1000 > 555:
        counter += 500

    # Skip 6-0 for thousands position
    if counter % 10000 > 5555:
        counter += 5000

# Distribute output to the thread pool
with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
    executor.map(make_pup, combos)