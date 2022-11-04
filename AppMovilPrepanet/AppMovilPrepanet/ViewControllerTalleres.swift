//
//  ViewControllerTalleres.swift
//  AppMovilPrepanet
//
//  Created by alex on 14/10/22.
//

import UIKit

class ViewControllerTalleres: UIViewController, UITableViewDelegate, UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return talleres.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! tallerCeldaTableViewCell
        cell.bgImage.image = UIImage(named: "taller\(String(indexPath.row+1))")
        cell.lbNombre.text = talleres[indexPath.row].nombre
        cell.lbStatus.text = talleres[indexPath.row].status
        
        switch talleres[indexPath.row].status {
        case "Aprobado":
            cell.statusView.backgroundColor = UIColor(red: 223/255, green: 255/255, blue: 202/255, alpha: 1)
            cell.lbStatus.textColor =
            UIColor(red: 47/255, green: 55/255, blue: 43/255, alpha: 1)
        case "Sin Asistencia":
            cell.statusView.backgroundColor = UIColor(red: 255/255, green: 229/255, blue: 148/255, alpha: 1)
            cell.lbStatus.textColor =
            UIColor(red: 77/255, green: 69/255, blue: 45/255, alpha: 1)
        case "No enrolado por no aprobar etapa 2":
            cell.statusView.backgroundColor = UIColor(red: 255/255, green: 229/255, blue: 148/255, alpha: 1)
            cell.lbStatus.textColor =
            UIColor(red: 77/255, green: 69/255, blue: 45/255, alpha: 1)
        default:
            cell.statusView.backgroundColor = UIColor(red: 255/255, green: 255/255, blue: 255/255, alpha: 1)
            cell.lbStatus.textColor =
            UIColor(red: 31/255, green: 31/255, blue: 31/255, alpha: 1)
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    @IBOutlet weak var tableViewTalleres: UITableView!
    
    var talleres = [taller]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        talleres = [
            taller(nombre: "Liderazgo Positivo y Transformación Personal", status: "Aprobado", desc: "Transformar su vida y aumentar tu riqueza y capital psicológico, con el fin de tener mayor éxito estudiantil, lograr una mayor influencia en su contexto y cambiar el entorno."),
            taller(nombre: "Mis Habilidades y Motivaciones", status: "Aprobado", desc:"Reconocimiento de habilidades, destrezas, fortalezas. FODA. GATO"),
            taller(nombre: "Mis Emociones", status: "Sin Asistencia", desc:"¿Qué son las emociones? Emociones, biología de la salud. Importancia de las emociones. Identificación de emociones. Tipos de emociones. Inteligencia emocional."),
            taller(nombre: "Mis Relaciones", status: "No enrolado por no aprobar etapa 2", desc:"Desarrollo de empatía. (Competencias emocionales e interpersonales). Tipos de relaciones. Aspectos importantes en las relaciones. Límites personales. Mis relaciones interpersonales. Mapa de mis relaciones."),
            taller(nombre: "Mis Àreas de Oportunidad", status: "No Cursado", desc:"Metamomento. Expresión de emociones. Posiciones ante la comunicación de emociones. La inteligencia emocional y la comunicación asertiva. Regulación de emociones. Desarrollo de resolución de conflictos (El plano inteligente-emocional)"),
            taller(nombre: "Mis Metas", status: "No Cursado", desc:"Esferas/dimensiones de la persona. Equilibrio para lograr el bienestar. *PFP. Metodología SMART. Desarrollo de plan de acción y toma de decisiones.")
        ]
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let target = segue.destination as? ViewControllerInfoTaller
        let index = tableViewTalleres.indexPathForSelectedRow!
        target?.tallerInfo = talleres[index.row]
        target?.img = UIImage(named: "taller\(String(index.row+1))")
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }

}
