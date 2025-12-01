import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, Scale, Award, BookOpen } from 'lucide-react'

export interface Lawyer {
  name: string
  barAssociation: string
  sanadNo: string
  enrolment: string
  district: string
  courtType: string
  status: string
}

interface LawyerGridProps {
  lawyers: Lawyer[]
}

export function LawyerGrid({ lawyers }: LawyerGridProps) {
  if (lawyers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No lawyers found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lawyers.map((lawyer, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50">{lawyer.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{lawyer.status}</p>
              </div>
              <Badge variant="outline" className="shrink-0 border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300">
                {lawyer.courtType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Scale className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{lawyer.barAssociation}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{lawyer.district}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 mt-3">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Award className="w-3 h-3" /> Sanad No.
                </p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{lawyer.sanadNo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Enrolment
                </p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{lawyer.enrolment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
