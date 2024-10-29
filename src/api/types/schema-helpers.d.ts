type TDatabase = import('./schema.types').Database['public']

type TTableKeys = keyof TDatabase['Tables']

type TDBEnums = TDatabase['Enums']

type TTableModel<K extends TTableKeys> = TDatabase['Tables'][K]['Row']
