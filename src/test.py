import os
import shutil 

os.mkdir("./2016")

for i in range(1, 26):
    shutil.copytree("./template", f"./2016/{i}")

for i in range(2017, 2022):
    shutil.copytree("./2016", f"./{i}")
