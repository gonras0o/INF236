import java.util.*;
//import java.util.zip.*;

public class UsaAgenda
{
	// Relaciones
	private static Vector agendas = new Vector();
	
	// Operaciones
	public static void creaAgenda(int anio, String mensajeEstandarAlarma) throws DataFormatException 
	{
		if (anio > 0 && mensajeEstandarAlarma != null && !(mensajeEstandarAlarma.trim()).equals(""))
			if (getAgenda(anio) == null)
				agendas.addElement(new Agenda(anio, mensajeEstandarAlarma));
			else
				throw new DataFormatException("Datos_no_validos_para_crear_agenda");
	}
	
	private static Agenda getAgenda(int anio) 
	{
		// Precondición: anio>0
		int i = 0;
		while (i < agendas.size() && ((Agenda)(agendas.elementAt(i))).getAnio() != anio)
			i++;
		if (i < agendas.size())
			return (Agenda)agendas.elementAt(i);
		else
			return null;
	}
}