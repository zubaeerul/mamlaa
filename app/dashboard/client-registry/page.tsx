import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, CheckCircle2, Plus, Download } from "lucide-react"

export default function ClientRegistryPage() {
  const clients = [
    {
      name: "Abul Kalam",
      phone: "+880 1711-234567",
      cases: 2,
      verified: true,
      image: "/bangladeshi-man-portrait.jpg",
      initials: "AK",
    },
    {
      name: "Fatema Begum",
      phone: "+880 1812-345678",
      cases: 1,
      verified: true,
      image: "/bangladeshi-woman-portrait.jpg",
      initials: "FB",
    },
    {
      name: "Jamuna Trading Ltd",
      phone: "+880 1913-456789",
      cases: 5,
      verified: true,
      image: "/corporate-office-building.png",
      initials: "JT",
    },
    {
      name: "Rahim Uddin",
      phone: "+880 1614-567890",
      cases: 1,
      verified: false,
      image: "/bangladeshi-man-portrait-2.jpg",
      initials: "RU",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Client Repository</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Sync from mamlaa
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Offline Client
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client, index) => (
          <Card key={index} className="overflow-hidden bg-white border-gray-200 shadow-sm rounded-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={client.image || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{client.phone}</p>

                <div className="flex items-center gap-2 mb-4">
                  {client.verified && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified NID
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-gray-600 border-gray-200">
                    {client.cases} Active Cases
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-center gap-4 border-t border-gray-100">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 border border-gray-200 shadow-sm hover:bg-blue-100 hover:text-blue-700 text-slate-700"
              >
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 border border-gray-200 shadow-sm hover:bg-green-100 hover:text-green-700 text-slate-700"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
