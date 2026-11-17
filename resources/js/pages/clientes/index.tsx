import { Head, router } from '@inertiajs/react';
import { Cliente } from "@/types";
import { useState } from "react";
import { toast } from 'sonner';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClienteForm from "./cliente-form";

interface Props {
    clientes: Cliente[];
}

export default function ClienteIndex({ clientes }: Props){
    const [ShowForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Cliente | null>(null);

    function handleEdit(cliente: Cliente){
        setEditing(cliente);
        setShowForm(true);
    }

    function handleDelete(cliente: Cliente){
        if (!confirm(`Delete "${cliente.nombre}"?`)) return;
        router.delete(`/clientes/${cliente.id}`,{
            onSuccess: () => toast.success('Cliente eliminado.'),
        });
    }

    function handleClose() {
        setShowForm(false);
        setEditing(null);
    }

    return (
        <>
            <Head title='Clientes' />
            <div className='p-6'>
                <div className='mb-4 flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>Clientes</h1>
                    <Button onClick={() => { setEditing(null); setShowForm(true); }}>
                        <Plus className='mr-2 h-4 w-4' />
                        Crear Cliente
                    </Button>
                </div>
                <div className='rounded-lg border'>
                    <table className='w-full text-sm'>
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Direccion</th>
                                <th className="px-4 py-3 text-right">Provincia</th>
                                <th className="px-4 py-3 text-right">Codigo Postal</th>
                                <th className="px-4 py-3 text-right">Telefono</th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                        No hay clientes. Crea uno nuevo.
                                    </td>
                                </tr>
                            )}
                            {clientes.map((cliente) => (
                                <tr key={cliente.id} className="border-b last:border-0 hover:bg-muted/25">
                                    <td className="px-4 py-3 font-medium">{cliente.nombre}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{cliente.direccion}</td>
                                    <td className="px-4 py-3 text-right">{cliente.provincia}</td>
                                    <td className="px-4 py-3 text-right">{cliente.codigo_postal}</td>
                                    <td className="px-4 py-3 text-right">{cliente.telefono}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(cliente)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cliente)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {
                ShowForm && (
                    <ClienteForm
                        cliente={editing}
                        onClose={handleClose}
                    />
                )
            }
        </>
    );
}

ClienteIndex.layout = {
    breadcrumbs: [{ title: 'Clientes', href: '/clientes' }],
};
