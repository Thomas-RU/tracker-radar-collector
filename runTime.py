import os

for x in range(1):
    os.system('npm run crawl -- -i ./InputData/inputURL.txt -o ./data/run{}/ -c 6 -v -f --chromium-version 1131109'.format(x))
    

