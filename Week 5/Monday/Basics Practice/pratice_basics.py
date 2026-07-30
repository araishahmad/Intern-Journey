first_name = 'Araish'
last_name = 'Ahmad'

full_name = first_name + ' ' + last_name
user_age = 21

can_vote = user_age >= 18

print('User can vote:', can_vote)

my_list = []

for i in range(2):
    item = str(input('Enter the item: '))
    my_list.append(item)

my_list.pop()
del my_list[0]
my_list.insert(2, 'Araish')

print(my_list)

car = {
    'name': 'Audi',
    'model': 2021,
    'engine_cc': 'V8 4780'
}

car.items()
car.keys()
car.values()

if 'name' in car and car['name'] == 'Audi':
    print('True')

if car.get('name') == 'Audi':
    print('True')

x = [1, 2, 4]
y = [1, 2, 4]

print(x is y)

def greet(first_name, last_name):
    print(f'Hello {first_name} {last_name}')

greet(last_name='Ahmad', first_name='Araish')

n = int(input('Enter a number: '))
x = lambda a: a * n
print(x(2))

def double_number(n):
    return lambda a: a * n

func = double_number(2)
print(func(11))

import requests
from urllib.parse import quote
from datetime import datetime, timedelta
import pandas as pd

# Getting dates
today = datetime.now()
week_ago = today - timedelta(days=7)

# Formatting dates for API
start_date = week_ago.strftime('%Y-%m-%d')
end_date = today.strftime('%Y-%m-%d')

def geoCoding(city_name):
    url = f'https://geocoding-api.open-meteo.com/v1/search?name={quote(city_name)}&count=1'
    res = requests.get(url)
    data = res.json()

    if 'results' not in data:
        return None

    result = data['results'][0]
    return result['longitude'], result['latitude']

def get_weather(longitude, latitude):
    url = f'https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m'

    res = requests.get(url)
    data = res.json()

    return data['current']['temperature_2m']

def get_lastWeek_weather(longitude, latitude):
    url = f'https://archive-api.open-meteo.com/v1/archive?latitude={latitude}&longitude={longitude}&start_date={start_date}&end_date={end_date}&daily=temperature_2m_max,temperature_2m_min&timezone=auto'

    res = requests.get(url)
    data = res.json()

    return data['daily']

city_name = input('Enter city name: ')
coordinates = geoCoding(city_name)

if coordinates:
    lon, lat = coordinates
    # current_weather = get_weather(longitude=lon, latitude=lat)
    # print(f'Current temperature of {city_name}: {current_weather}°C')
    weather = get_lastWeek_weather(lon, lat)

    dates = weather['time']
    max_temps = weather['temperature_2m_max']
    min_temps = weather['temperature_2m_min']

    daily_data = weather
    df = pd.DataFrame({
        'date': daily_data['time'],
        'max_temp': daily_data['temperature_2m_max'],
        'min_temp': daily_data['temperature_2m_min']
    })

    print(df)
    

    # print(f'Last week temperature of {city_name}: ')
    # for date, max_temp, min_temp in zip(dates, max_temps, min_temps):
    #     print(f'{date}: max {max_temp}°C, min {min_temp}°C')

else:
    print(f'{city_name} is not a valid city')