class Create {
  infoCards = [
    {
      icon: 'icon-camera',
      title: 'Робіть якісні фотографії',
      text: 'Це може здатися очевидним, але якісні фотографії можуть значно вплинути на час, необхідний для продажу вашого автомобіля. Оголошення з хорошими фотографіями продаються втричі швидше'
    },
    {
      icon: 'icon-filter',
      title: 'Дотримуйтесь простоти',
      text: 'Опис транспортного засобу повинен бути коротким і простим. Викликайте додаткові опції, яких можуть не мати інші подібні автомобілі. І не забудьте згадати повну історію обслуговування, якщо вона у вас є.'
    },
    {
      icon: 'icon-guard',
      title: 'Будьте чесними',
      text: 'Важливо, щоб опис автомобіля був точним. Якщо на вашому автомобілі є невелика подряпина - будьте чесними. Це заощадить час на непотрібних переглядах, якщо покупці знають про будь-які недоліки з самого початку.'
    }
  ]

  async createCar (car: TTables<'cars'>) {
    const { data } = await supabase
      .from('cars')
      .insert([
        { ...car }
      ])
      .select()

    return data
  }

  toDatabaseObject (obj: any) {
    const newObject = {} as typeof obj

    function camelToUnderscore (key: keyof typeof obj) {
      return key.toString().replace(/([A-Z])/g, '_$1').toLowerCase()
    }

    for (const camel in obj) {
      newObject[camelToUnderscore(camel as keyof typeof obj)] = obj[camel]
    }

    return newObject
  }
}

const createService = new Create()
export default createService
