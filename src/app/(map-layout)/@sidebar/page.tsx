import React from 'react';
import Separator from "@/components/separator";

export default function MainSidebar() {
    return (
        <div>
            <h1 className='font-bold text-lg mb-2'>
                Bienvenido a Mapeando y Preservando
            </h1>

            <p className='mb-4'>
                La iniciativa ciudadana <em>Mapeando y Preservando la Herencia Arquitectónica de Nuevo
                León</em>{' '}
                tiene como objetivo la creación de una plataforma innovadora para mapear, reconstruir y preservar
                las memorias de edificios antiguos del estado de Nuevo León, México.
            </p>
            <Separator/>
            <p className='mt-4'>
                Selecciona un edificio para consultar su información, o busca un edificio en particular con la barra
                de búsqueda.
            </p>
        </div>
    )
}
