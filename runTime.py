import os

for x in range(6):
    os.system('npm run crawl -- -i ./InputData/inputURL.txt -o ./data/run{}/ -c 8 -v -f'.format(x))
    

