import React from 'react'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="text" placeholder="text" />
}

interface Users{
    id : string,
    name : string,
    username : string
}

const Users = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users : Users[] = await res.json()
  return (
    <div style={{ display: 'flex', gap: 20 }}>
        <Card className="w-[400px] stacked-fractions">
        <Table className="bg-background text-foreground">
            <TableHeader className="h-4 text-center">
                <TableRow>
                    <TableHead className='text-center'>Name</TableHead>
                    <TableHead className='text-center'>Username</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id} className="text-center">
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                    </TableRow>
                ))}
            </TableBody>        
        </Table>
        </Card>
        <Card className="w-[400px]">
            <InputDemo />
            <InputDemo />
        </Card>

    </div>
  )
}

export default Users