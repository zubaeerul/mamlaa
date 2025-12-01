import { Star, Video, Building, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LawyerCardProps {
  name: string
  title: string
  image: string
  experience: string
  court: string
  languages: string[]
  rating: number
  reviews: number
  price: string
  isPremium?: boolean
  isVerified?: boolean
}

export function LawyerCard({
  name,
  title,
  image,
  experience,
  court,
  languages,
  rating,
  reviews,
  price,
  isPremium,
}: LawyerCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white border-gray-200 shadow-sm rounded-lg">
      <CardHeader className="p-4 pb-2 flex flex-row gap-4 items-start space-y-0">
        <Avatar className="h-16 w-16 border-2 border-gray-100">
          <AvatarImage src={image || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
            {isPremium && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-900 hover:bg-amber-200 gap-1">
                <Star className="h-3 w-3 fill-amber-900" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{title}</p>
          {isPremium && (
            <div className="flex items-center gap-1 mt-1 text-xs text-green-700 font-medium">
              <ShieldCheck className="h-3 w-3" />
              Sanad Verified
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="col-span-2">
            <span className="text-gray-500 font-medium">Court:</span>{" "}
            <span className="font-semibold text-gray-900">{court}</span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Exp:</span>{" "}
            <span className="font-semibold text-gray-900">{experience}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="font-bold text-gray-900">{rating}</span>
            <span className="text-gray-500 font-medium">({reviews})</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 font-medium">Languages:</span>{" "}
            <span className="font-semibold text-gray-900">{languages.join(", ")}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-sm font-semibold text-blue-600">
            {price} <span className="text-gray-500 font-medium">/ consultation</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-3">
        <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
          <Video className="mr-2 h-4 w-4" />
          Video Consult
        </Button>
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white border-none">
          <Building className="mr-2 h-4 w-4" />
          Chamber
        </Button>
      </CardFooter>
    </Card>
  )
}
