from PIL import Image
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

# List of parts
parts_groups = ["one", "two", "three", "four", "five"]

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
    body = Image.open("img/parts/" + parts_groups[body] + "/body.png")
    shirt = Image.open("img/parts/" + parts_groups[shirt] + "/shirt.png")
    ears = Image.open("img/parts/" + parts_groups[ears] + "/ears.png")
    fur = Image.open("img/parts/" + parts_groups[fur] + "/fur.png")
    face = Image.open("img/parts/" + parts_groups[face] + "/face.png")

    # Paste images over each other
    
    body.alpha_composite(fur) 
    body.alpha_composite(face)
    body.alpha_composite(ears) 
    body.alpha_composite(shirt) 

    # Output the image
    body.save("img/collection/" + img_id + ".png", "PNG")

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

    
    
    