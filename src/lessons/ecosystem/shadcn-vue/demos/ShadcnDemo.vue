<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const name = ref('Ada')
const plan = ref('pro')
const seats = ref([5])
const notify = ref(true)
const open = ref(false)
const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const

function save() {
  open.value = false
  toast.success(`Saved ${name.value}`, { description: `${plan.value} · ${seats.value[0]} seats · notify ${notify.value}` })
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <div class="stack">
      <span class="label">Button variants (cva)</span>
      <div class="flex flex-wrap gap-2">
        <Button v-for="v in variants" :key="v" :variant="v" size="sm">{{ v }}</Button>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge>default</Badge><Badge variant="secondary">secondary</Badge><Badge variant="outline">outline</Badge><Badge variant="destructive">destructive</Badge>
      </div>
      <Tooltip>
        <TooltipTrigger as-child><Button variant="outline" size="sm" class="self-start">hover me</Button></TooltipTrigger>
        <TooltipContent>Reka UI handles positioning, focus and aria</TooltipContent>
      </Tooltip>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Team settings</CardTitle>
        <CardDescription>All inputs are v-model-able shadcn components.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-1.5"><Label for="sh-name">Name</Label><Input id="sh-name" v-model="name" /></div>
        <div class="grid gap-1.5">
          <Label>Plan</Label>
          <Select v-model="plan">
            <SelectTrigger class="w-40"><SelectValue placeholder="Plan" /></SelectTrigger>
            <SelectContent><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="team">Team</SelectItem></SelectContent>
          </Select>
        </div>
        <div class="grid gap-1.5"><Label>Seats: {{ seats[0] }}</Label><Slider v-model="seats" :min="1" :max="50" /></div>
        <Label class="flex items-center gap-2"><Switch v-model="notify" /> Email notifications</Label>
      </CardContent>
      <CardFooter>
        <Dialog v-model:open="open">
          <DialogTrigger as-child><Button>Save…</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm</DialogTitle>
              <DialogDescription>Save {{ name }} on the {{ plan }} plan with {{ seats[0] }} seats?</DialogDescription>
            </DialogHeader>
            <DialogFooter><Button variant="outline" @click="open = false">Cancel</Button><Button @click="save">Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  </div>
</template>
