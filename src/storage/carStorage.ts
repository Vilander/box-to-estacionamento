import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@boxtoestacionamento:carros'

export type CarStorageItem = {
    id: string
    placa: string
    hora: string
    entradaHora: number;
    valor: number
}

async function getCars(): Promise<CarStorageItem[]> {
    try {
        const storage = await AsyncStorage.getItem(STORAGE_KEY)
        return storage ? JSON.parse(storage) : []
    } catch (error) {
        throw new Error('CAR_STORAGE_GET: ' + error)
    }
}

async function saveCars(cars: CarStorageItem[]): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cars))
    } catch (error) {
        throw new Error('CAR_STORAGE_SAVE: ' + error)
    }
}

async function addCar(newCar: CarStorageItem): Promise<CarStorageItem[]> {
    //console.log('addcar')
    const cars = await getCars()
    const updatedCars = [...cars, newCar]
    await saveCars(updatedCars)
    return updatedCars
}

async function removeCar(id: string): Promise<CarStorageItem[]> {
    const cars = await getCars()
    const updatedCars = cars.filter((car) => car.id !== id)
    await saveCars(updatedCars)
    return updatedCars
}

async function clearCars(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        throw new Error('CAR_STORAGE_CLEAR: ' + error)
    }
}

export const CarStorage = {
    getCars,
    addCar,
    removeCar,
    clearCars,
}

