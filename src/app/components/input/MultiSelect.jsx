'use client'

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

const MultiSelect = ({
                         options,
                         selected,
                         onChange,
                         placeholder = "Select options...",
                     }) => {
    const inputRef = React.useRef(null)
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const handleUnselect = (option) => {
        onChange(selected.filter((s) => s !== option))
    }

    const handleKeyDown = (e) => {
        const input = inputRef.current
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    const newSelected = [...selected]
                    newSelected.pop()
                    onChange(newSelected)
                }
            }
            // This is not necessary but adds a nice touch
            if (e.key === "Escape") {
                input.blur()
            }
        }
    }

    const selectables = options.filter((option) => !selected.includes(option))

    return (
        <Command className="overflow-visible bg-transparent col-span-2">
            <div
                className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md
                focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            >
                <div className="flex gap-1 flex-wrap">
                    {selected.map((option) => {
                        return (
                            <Badge key={option} variant="secondary">
                                {option}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(option)
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        )
                    })}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground
                    shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            {selectables.map((option) => {
                                return (
                                    <CommandItem
                                        key={option}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onSelect={() => {
                                            setInputValue("")
                                            onChange([...selected, option])
                                        }}
                                        className={"cursor-pointer"}
                                    >
                                        {option}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    )
}

export default MultiSelect
