type TCar = TTables<'cars'> & {'models': TTables<'models'>} & {locations: TTables<'locations'>}
