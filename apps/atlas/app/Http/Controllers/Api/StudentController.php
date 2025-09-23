<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $q    = $request->query('q');
        $year = $request->query('year');
        $per  = $request->query('per', 20); // デフォルト20件

        $query = Student::query()
            ->when($q, function ($query, $q) {
                $like = "%".str_replace(['%','_'], ['\\%','\\_'], $q)."%";
                $query->where(function ($qq) use ($like) {
                    $qq->where('name', 'like', $like)
                    ->orWhere('email', 'like', $like);
                });
            })
            ->when($year, fn($query) => $query->where('graduation_year', $year))
            ->orderByDesc('id');

        $students = $query->paginate($per);

        return response()->json($students);
    }
    
    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "email" => "required|email|unique:students,email",
            "graduation_year" => "required|integer"
        ]);
        $student = Student::create($request->only(['name','email','graduation_year']));
        return response()->json($student, 201);
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "email" => "required|email|unique:students,email," . $student->id,
            "graduation_year" => "required|integer"
        ]);
        $student->update($validated);

        return response()->json($student, 200);
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return response()->noContent();
    }
}
